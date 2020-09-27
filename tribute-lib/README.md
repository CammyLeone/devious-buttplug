# Buttplug Tribute

## What it does

Got a website with a button that *begs* to be clicked?  Need to give your website customers some *encouragement* to click an important link?

This script, when embedded on your website, imbues an HTML element with the magical power of making your user's bluetooth-enabled sex toy vibrate.  As their cursor gets closer to the button, it vibrates more strongly!

## How it does it

It uses [buttplug.io](http://buttplug.io).  In theory, it supports [these devices](https://iostindex.com/?filter0Features=OutputsVibrators&filter1ButtplugSupport=2).

## How to use it

This library requires two things - a clickable element to start the process, and a clickable element that you want to sprinkle vibration goodness onto.  These are BYO - you need to provide these elements; Buttplug Tribute does not create them.

To install, add the following to your page, ideally as the last tag *inside* the `<body>...</body>` tag:

```
<script src="https://cdn.jsdelivr.net/gh/CammyLeone/devious-buttplug@main/buttplug-tribute/dist/index.js" />
```

By default, the script looks for elements with ID `connect` and `tribute`, respectively. If you need to change this ID, or use a CSS selector, (or other selector ([tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors))), add the following:

```
  <script type="text/javascript">
    ButtplugTribute.connectButton = ".some-css-class";
    ButtplugTribute.tributeButton = ".some-other-css-class";
  </script>
```
