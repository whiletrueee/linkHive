<div align="center">
  <img alt="Logo" src="assets/logo.png" height="56" />
</div>

<br>
<p align="center">
Meet Live Hive, the easiest way of sharing an URL.
</p>
<p align="center">
crafted with <span style="color: #8b0000;">&hearts;</span> by your besties,<a hrefs="https://github,com/shawshankkumar"> Shashank</a> and <a hrefs="https://github.com/flying-solo">Harshit</a>.
</p>
<p align="center">
    <img src="https://img.shields.io/badge/version-1.0.0-yellowgreen" alt="version 1.0.0"/>
    <img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="license MIT"/>
    <img src="https://img.shields.io/badge/author-shashank&harshit-orange" alt="author shashank and harshit"/>
</p>
<br>

### While we have applied for this to be deployed on the chrome extension store, it is yet to be approved. If you want to run this locally, we recommend going in the client/latest-build folder and unzipping the latest version there and then loading it into the chrome dev tools. Everything will work as excepted.

<br>

## Installation (If you wish to build it yourself and run everything locally)🔧

Install dependencies and build the server

```
$ cd client && npm
```

Build the react app

```
$ npm run build
```

<br>

### Supabase database and edge functions are hosted by us(supabase.io), we do not recommend running them locally, but if you need to, supabase has an amazing doc on how to run the entire server locally. It involved install supabase-cli.

<br>

## Creators💥

| <p align="center">![Shashank kumar](https://github.com/shawshankkumar.png?size=128)<br>[Shashank Kumar](https://github.com/shawshankkumar)</p> | <p align="center">![Harshit Singh](https://github.com/flying-solo.png?size=128)<br>[Harshit Singh](https://github.com/flying-solo)</p> |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |

[Shashank's twitter handle](https://twitter.com/Ka_redemption)
<br>
[Shashank's github profile](https://github.com/shawshankkumar)
<br>
[Harshit's twitter handle](https://twitter.com/singharshit07)
<br>
[Harshit's github profile](https://github.com/flying-solo)

<br>

## Description of Supabase products used:

<br>

### Supabase Auth:

#### Our entire product revolves around sending and receiving links. To send a link you have to be registered and logged in, and we use emails for that. So that we can easily identify you and then use that to send the emails. We could have made a custom auth but we thought we'd give supabase auth(email and password) a try and it was smooth like butter. We couldn't find any examples of chrome extensions using supabase auth, so we made our own! (Expect an blog on using supabase auth with chrome extension real soon). We use the access_token from supabase auth paired with edge functions to implement seamless flow with RLS.

<br>

### Supabase Database

#### We use supabase database (Postgres at core) to store the emails, links and messages that have been sent by a user. We also use the database to store user preferences (coming soon).

<br>

### Supabase Edge Functions

#### With Edge Functions powered by Deno, our job to develop APIs became extremely easy. We literally made this in a couple of days due to our university exams and developing with edge functions was like creating functions for every use case. We first created a send-link function, then when the need came, we made the fetch links function. We didn't have to manage any servers or deployments, supabase cli did everything in seconds. We are also working on analytics(The sender can see how many times a link has been opened and from where) and for that we are creating an entire URL shortener using edge functions.

<br>
## License 📜

`Link hive` is available under the MIT license. See the LICENSE file for more info. Feel free to contribute it as needed!

## Contributing 🤝

Please read `Contributing.md` for details on our code of conduct, and the process for submitting pull requests to us.

## Forking this repo 🚨

Many people have contacted us asking if they can use this code for their own websites. The answer to that question is usually "yes", with attribution. There are some cases, such as using this code for a business or something that is greater than a personal project, that we may be less comfortable saying yes to. If in doubt, please don't hesitate to ask us.

We value keeping this site open source, but as you all know, _**plagiarism is bad**_. We spent a non-negligible amount of effort developing, designing, and trying to perfect this iteration of our website, and we are proud of it! All we ask is to not claim this effort as your own.

So, feel free to fork this repo. If you do, please just give us proper credit by linking back to us.
