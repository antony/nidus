<div style="text-align:center">
[![Nidus](assets/logo-299x145.png)]
</div>

## Nidus

[![CircleCI](https://circleci.com/gh/antony/nidus/tree/master.svg?style=shield)](https://circleci.com/gh/antony/nidus/tree/master) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-green.svg)](https://github.com/feross/standard) [![npm](	https://img.shields.io/npm/v/nidus-core.svg)](https://npmjs.org/package/nidus-core)

A password store which doesn't store. Instead, it deterministically generates the exact same password for you every time, based on a keyword and your master password.

Keyword can be a website url, an email address, a secret folder name, or anything else you choose.

As long as somebody has the exact same configuration as you (and the master passwords), the generated passwords will always be the same, meaning you can set your logins to use them, and they will never need to be insecurely stored anywhere!

#### Quickstart

To grab the Nidus GUI for Linux, MacOS and Windows, head over to the [releases page](https://github.com/antony/nidus/releases)

For a cli version:

```bash
npm install -g nidus
nidus
```

#### Slowstart

On first run, nidus will look for a config file. If not found, it will take you through the steps to generate one,
and then exit.

Once your configuration is generated, you can start to generate passwords:

```
nidus show http://www.example.com
// Simple q15hBZw8mvxkIxW2
// Complex XCCS8w/cq.B:^Hx6
// Readable colors battery blackberry attraction bicycle allegiance
```

Nidus will show a simple password, a complex password, and a readable password (a number of words).
The length of the complex and simple passwords is determined by 'keyLength' in your configuration steps.
The length of the readable password (in words, not characters), is determined by 'readableLength' in your configuration steps.
You can choose which to use based on restrictions imposed by what the password is used for.

### Credits

* Word list for human readable passwords from [https://github.com/dariusk/corpora](https://github.com/dariusk/corpora).
* Idea based roughly on a concept and implementation by [https://github.com/spaceshuttl/visionary](https://github.com/spaceshuttl/visionary)
