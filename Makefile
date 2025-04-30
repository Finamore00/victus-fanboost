NAME=beastmode
DOMAIN=sam

# Define variables for paths and commands
EXTENSION_DIR := ~/.local/share/gnome-shell/extensions/$(NAME)@$(DOMAIN)
DIST_DIR := dist
SCHEMAS_DIR := schemas

.PHONY: all pack install

all: $(DIST_DIR)/extension.js

node_modules: package.json
	npm install

$(DIST_DIR)/extension.js $(DIST_DIR)/prefs.js: node_modules
	tsc || true

$(SCHEMAS_DIR)/gschemas.compiled: $(SCHEMAS_DIR)/org.gnome.shell.extensions.$(NAME).gschema.xml
	glib-compile-schemas $(SCHEMAS_DIR)

$(NAME).zip: $(DIST_DIR)/extension.js $(DIST_DIR)/prefs.js $(SCHEMAS_DIR)/gschemas.compiled ./fanboost.sh
	@cp -r $(SCHEMAS_DIR) $(DIST_DIR)/
	@cp metadata.json $(DIST_DIR)/
	@(cd $(DIST_DIR) && zip ../$(NAME).zip -9r .)

pack: $(NAME).zip

install: $(NAME).zip
	@mkdir -p $(EXTENSION_DIR)
	@rm -rf $(EXTENSION_DIR)
	@mv $(DIST_DIR) $(EXTENSION_DIR)
	@cp ./fanboost.sh $(EXTENSION_DIR)/
	@rm -rf $(DIST_DIR) $(NAME).zip