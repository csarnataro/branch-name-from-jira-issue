# Branch name from Jira issue

A Chrome extension to generate a git branch name from a Jira issue.

Download it from https://chrome.google.com/webstore/detail/git-branch-name-from-jira/jegpbabnkjajonljgekihmlldkklneci

It works only in Jira hosted on the Atlassian domain, e.g. https://your-company.atlassian.net/jira

Jira already comes with a similar built-in functionality, available in the sidebar of your ticket: `Development > Create branch`.

But the built-in functionality is quite limited in terms of configuraton. For this reason I implemented this Chrome extension which allow to configure the branch name with a couple of interesting options:
- Add one or more prefixes (e.g. your name or the project name) in front of the branch name.
  E.g. if the ticket title is `Fix logo`, you may want to add a prefix to get `frontend/fix-logo` or `backend/fix-logo`.
- Add a prefix depending on the issue type (e.g. `feat`, `fix`, etc)
- Optionally add the git command `git checkout -b` in front of the branch name
- Limit the length of the branch name

## How it works
After you install the Chrome extension from https://chrome.google.com/webstore/detail/git-branch-name-from-jira/jegpbabnkjajonljgekihmlldkklneci a new icon will appear in the list of available extensions.
If you want, you can right-click on the icon and choose to pin the extension, so that it's always
available in the browser toolbar

If you have a web page open which is not a Jira issue, and you click on the extension icon, the extension has no effect.
A small popup will inform you that the current page is not a valid Jira issue.

On the other hand, if you are on a page which is a valid Jira ticket, a popup will present you one or more options (depending 
on how many prefixes you have configured) and just by clicking on the branch name, the name itself will be 
copied in the clipboard of your computer.

# Changelog

## [1.0.1] - 2023-10-14
### Fixed

Fixed an error which caused the branch name to be empty with the latest version of Jira.
An attribute on a couple of DOM elements have been renamed, so we were not retrieving
them anymore using CSS selectors.
Added a fallback for that CSS selectors, so that it should work with multiple versions of Jira.

## [1.0.0] - 2023-09-23
### Fixed

Fixed "Reset" button behaviour in Options page.

## [0.11.2] - 2023-09-14
### Added

Added latest git hash in options page.

## [0.11.1] - 2023-09-14
### Added

Added version number in options page (see issue [#11](https://github.com/csarnataro/branch-name-from-jira-issue/issues/11))

## [0.10.0] - 2023-09-13 - Unreleased
- Fixed [#8](https://github.com/csarnataro/branch-name-from-jira-issue/issues/8): remove extra hyphens

## [0.9.2] - 2023-09-13 - Unreleased
### Fixed
- Fixed [#7](https://github.com/csarnataro/branch-name-from-jira-issue/issues/7): window width shrinks to 200 pixels
- Fixed all npm vulnerabilities


## Credits
This extension is inspired by JIRA Issue Branch Name Generator

https://chrome.google.com/webstore/detail/jira-issue-branch-name-ge/apgennglojmcjggiideonbmhnadicglo

For some reason that extension is not working with my company's Jira setup (e.g. we are using a different URL structure).
That's why I started to work on this extension, hoping it can be helpful for someone else.

## Development
Start in development mode using `npm start`. This will launch webpack in watch mode, so that every change will be re-built on the fly and available in Chrome

To build the extension for the Chrome Web Store, use `npm run pack`.

## Reference

- Creating a Chrome Extension with React and TypeScript

  https://react.christmas/2020/12

- How To Build A Chrome Extension NEW Manifest V3

  https://dev.to/anobjectisa/how-to-build-a-chrome-extension-new-manifest-v3-5edk



