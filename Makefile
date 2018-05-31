MAKEFLAGS += --no-print-directory --silent
SHELL = /usr/bin/env bash

.PHONY: serve
serve:
	npx parcel index.html

.PHONY: build
build:
	npx parcel build index.html