NAME    := active-tab-sorting-firefox
SVG     := images/circle-sort.svg
SIZES   := 16 32 48 128 256 512
ICONS   := $(addprefix images/icon-,$(addsuffix .png,$(SIZES)))
SOURCES := manifest.json background.js $(SVG) $(ICONS)
STORE   := manifest.json background.js $(SVG) $(ICONS) LICENSE

.PHONY: all icons zip store clean

all: zip

icons: $(ICONS)

images/icon-%.png: $(SVG)
	rsvg-convert --dpi-x=300 --dpi-y=300 -w $* -h $* $< -o $@
	optipng -o7 -quiet $@

zip: $(NAME).zip

$(NAME).zip: $(SOURCES)
	rm -v *.zip
	rm -f $@
	zip -r $@ $^

store: icons $(NAME)-store.zip

$(NAME)-store.zip: $(STORE)
	rm -f $@
	zip $@ $^

clean:
	rm -f $(ICONS) $(NAME).zip $(NAME)-store.zip
