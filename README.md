# JavaScript Library for Script Blocking and Unblocking

This project is a JavaScript library based on YETT that allows blocking the execution of scripts on web pages and provides a modal dialog user interface for users to selectively unblock scripts. 

## Features

- Script execution blocking to prevent the use of third-party cookies without the user's consent.
- Modal dialog user interface for managing script unblocking.
- Preferences storage in the browser session using `sessionStorage`.
- Easy integration into existing web projects.

## Usage

To use this library in your project, follow these steps:

1. Include the library in the <head> section of your web page before any other script:

   ```html
   <script>
      window.YETT_BLACKLIST = [];
      window.YETT_WHITELIST = [];
    </script>
   <script src="path/to/script-blocker.js"></script>

2. The library will automatically handle blocking script execution on the page. Users will see a "modal dialog" allowing them to manage unblocking preferences.

## Contributions

Contributions are welcome! If you'd like to contribute to this project, follow these steps:

Clone the repository:

  ```bash
  git clone https://github.com/cbatista8a/script-blocker.git
  ```

Create a branch for your contribution:

```bash
git checkout -b my-contribution
```

Make your changes and commit:

```bash
git commit -m "Add my contribution"
```

Push your changes to the remote repository:

```bash
git push origin my-contribution
```

Open a pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE.md) file for more details.

## Author

Carlos Batista <carlos.batista@cubadevops.com>

### Contact
If you have questions or suggestions, feel free to contact us via email.

Thank you for using our library!
