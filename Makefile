MAKEFLAGS += --no-print-directory --silent
SHELL = /usr/bin/env bash

WORKSPACE ?= $(shell pwd)
PYENV_HOME := ${WORKSPACE}/.pyenv
PYTHON_EXE ?= $(shell which python)

.PHONY: serve
serve:
	npx parcel index.html

.PHONY: build
build:
	npx parcel build index.html

.PHONY: install
install:
	#npm install
	rm -rf ${PYENV_HOME}
	virtualenv --no-site-packages ${PYENV_HOME} -p ${PYTHON_EXE}
	source ${PYENV_HOME}/bin/activate && \
		pip install -r requirements.txt


.PHONY: publish
publish: build
	source ${PYENV_HOME}/bin/activate && \
		ghp-import dist && \
		git push origin gh-pages
