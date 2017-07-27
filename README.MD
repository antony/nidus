## Unstore

A password store which doesn't store. Instead, it deterministically generates the exact same password for you every time, based on a keyword and your master password.

Keyword can be a website url, an email address, a secret folder name, or anything else you choose.

As long as somebody has the exact same configuration as you (and the master passwords), the generated passwords will always be the same, meaning you can set your logins to use them, and they will never need to be insecurely stored anywhere!

Currently in early alpha - do not use for production.

### Usage

#### Quickstart

```bash
npm install -g unstore
unstore
```

#### Slowstart

On first run, unstore will look for a config file. If not found, it will take you through the steps to generate one,
and then exit.

Once your configuration is generated, you can start to generate passwords:

```
unstore show http://www.example.com
// Simple q15hBZw8mvxkIxW2
// Complex XCCS8w/cq.B:^Hx6
```

Unstore will show a simple password, a complex password, and a readable password (a number of words).
The length of these passwords is determined by 'blockSize' in your configuration steps.
You can choose which to use based on restrictions imposed by what the password is used for.

### Credits

* Word list for human readable passwords from [https://github.com/dariusk/corpora](https://github.com/dariusk/corpora).
* Idea based roughly on a concept and implementation by [https://github.com/spaceshuttl/visionary](https://github.com/spaceshuttl/visionary)