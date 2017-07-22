## Unstore

A password store which doesn't store. Instead, it deterministically generates the exact same password for you every time, based on a keyword and your master password.

Keyword can be a website url, an email address, a secret folder name, or anything else you choose.

As long as somebody has the exact same configuration as you (and the master passwords), the generated passwords will always be the same, meaning you can set your logins to use them, and they will never need to be insecurely stored anywhere!

Currently in early alpha - do not use for production.

### Usage

#### Quickstart

```bash
npm install -g unstore
unstore --help
```

#### Slowstart

On first run, unstore will look for a config file. If not found, it will prompt you to generate one.

```
unstore config <master-password>
```
Where master-password is your master password for all passwords. Don't lose this!

```
unstore show antony@enzy.org
// Simple q15hBZw8mvxkIxW2
// Complex XCCS8w/cq.B:^Hx6
```

Unstore will show a simple password, and a complex password. You can choose which to use based on restrictions imposed by what the password is used for.