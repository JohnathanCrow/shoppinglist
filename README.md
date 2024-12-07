# shoppinglist - WIP

![screenshot](https://github.com/user-attachments/assets/5ac64a38-e2a5-4e97-b51b-f2e4f325ee19)

A shopping list web app that you can run in docker.

## Installation
### Docker
- ```docker pull ghcr.io/johnathancrow/shoppinglistcs``` - incoming

## Usage:
### Adding Items
- Type an item name and click Add or press Enter
- To add an item to a section, type "item-section" (e.g., "Bread-Baked")
- To create a section divider, type "- Section Name" (e.g., "- Frozen")
### Managing Items
- Click + to add an item to your weekly shop
- Drag items to reorder them
- Click the pencil icon to edit an item
- Click X to remove an item
### Weekly List
- Adjust quantities using the number input
- Add notes to items using the message icon
- Export your list using the clipboard, text, or image options
- Reset the weekly shop to clear all selections
### Database Management
- Save: Download a backup of your database
- Load: Restore from a previous backup
- Reset: Clear all items (use with caution!)
