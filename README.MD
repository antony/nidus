<div style="text-align:center">
![Nidus](assets/logo.png)
</div>

## Nidus

[![CircleCI](https://circleci.com/gh/antony/nidus/tree/master.svg?style=shield)](https://circleci.com/gh/antony/nidus/tree/master)

A password store which doesn't store. Instead, it deterministically generates the exact same password for you every time, based on a keyword and your master password.

Keyword can be a website url, an email address, a secret folder name, or anything else you choose.

As long as somebody has the exact same configuration as you (and the master passwords), the generated passwords will always be the same, meaning you can set your logins to use them, and they will never need to be insecurely stored anywhere!

Currently in early alpha - do not use for production.

### Usage

#### Quickstart

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
