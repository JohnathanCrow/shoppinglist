# Shopping List

![screenshot](https://github.com/user-attachments/assets/5ac64a38-e2a5-4e97-b51b-f2e4f325ee19)

A shopping list web app that you can self-host with docker. The left column is your database, and the right column is your shopping list. Fully functional, but still a work-in-process.

## Installation
### Docker
<pre>
  <code id="code-block">
    docker run -d --name shopping-list -p 7000:80 --restart unless-stopped ghcr.io/johnathancrow/shoppinglist:latest
  </code>
</pre>

## Usage:
### Adding Database Items
- Type an item name and click Add or press Enter
- To add an item to a section, type "item-section" (e.g., "Bread-Baked")
- To create a section divider, type "- Section Name" (e.g., "- Frozen")
### Managing Database Items
- Click + to add an item to your weekly shop
- Drag items to reorder them
- Click the pencil icon to edit an item
- Click X to remove an item
### Managing Shopping List Items
- Adjust quantities using the number input
- Add notes to items using the message icon
- Export your list using the clipboard, text, or image options
- Reset the weekly shop to clear all selections
### Other Controls
- Save: Download a backup of your database
- Load: Restore from a previous backup
- Reset: Clear all items (use with caution!)
