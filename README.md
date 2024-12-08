# Shopping List
![screenshot](https://github.com/user-attachments/assets/5ac64a38-e2a5-4e97-b51b-f2e4f325ee19)

A shopping list web app that you can self-host with docker. Data is saved locally via your browser, and can be exported/imported just in case.

## Installation
#### Docker
```
docker run -d --name shopping-list -p 3200:80 --restart unless-stopped ghcr.io/johnathancrow/shoppinglist:latest
```

## Usage
#### Adding Database Items
- Type an item name and click Add or press Enter (e.g., "Apple")
- Prepend a dash to create a divider (e.g., "-Fruit")
- Append a divider to automatically place the item (e.g., "Apple -Fruit")
#### Managing Database Items
- Drag the left edge of an item to reorder
- Click the + icon to add it to your list
- Click the pencil icon to edit the item
- Click the x icon to delete the item
#### Managing List Items
- Add notes to items using the message icon
- Adjust quantities using the number input
- Remove items by using the x icon
- Export your list using the clipboard, text, or image options
- Reset the list to clear all selections
#### Controls
- Save: Save a backup of your database
- Load: Load a backup of your database
- Reset: Reset all items in your database (caution!)

This usage guide can be found in the info icon beside the app header, alongside a light/dark mode toggle
