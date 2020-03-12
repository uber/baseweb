# Base Web VS Code Extension

## Available features

### Code Snippets

There are two code snippets for each Base Web component. One is for the import statement and second for the components itself. There are also some additional snippets for importing React and functional component body. Try to type and press `Tab` after:

- `Button import`
- `Button component`
- `React import`
- `React component`

### Coloring

When using the Base Web component library and design system, you need to often reference the design tokens and colors. It is not apparent what colors our variables result into. You might need to check the documentation first or test it in your app. Our extension adds a visual cue. By default, you will see all color variables underlined:

<img width="712" alt="coloring-dc8dca3d7a5390d6c2896bb9be033a9c" src="https://user-images.githubusercontent.com/1387913/74864668-c3500f80-5304-11ea-87ec-40c1ebeab941.png">

This feature can be configured in settings. You can disable it, switch between Dark and Light themes or choose a different visual cue like the background color.

### Theme Cheat Sheet

One of the most visited pages of our documentation is [Theming](/guides/theming/). We already mentioned colors but there are many other theming values related to sizing, fonts, borders and others. We really want to streamline this look up process so we have added Theme Cheat Sheet. You can open it through the command palette: `Base Web: Open theme cheat sheet`.

<img width="829" alt="cheat-sheet-a7a1f9392e52d504b47289b1f56ab0d3" src="https://user-images.githubusercontent.com/1387913/74864681-c6e39680-5304-11ea-8dad-039160b89709.png">

It opens instantly in a new VS Code tab, works offline and visualizes all theme variables so you can quickly get the right value.


### Open component-specific documentation pages

After pressing `CMD + SHIFT + P`, start typing the name of the Base Web component you'd like to look up documentation on, and VS Code will open the corresponding documentation site in your default browser.
