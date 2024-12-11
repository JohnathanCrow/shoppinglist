# Shopping List
![screenshot](https://github.com/user-attachments/assets/31f0ca0f-4a73-4a63-b95e-a48ad7b6a325)

A shopping list web app that you can self-host with docker. Data is saved locally via your browser, and backups can be exported/imported.

## Installation
#### Docker
```
docker run -d --name shopping-list -p 3200:80 --restart unless-stopped ghcr.io/johnathancrow/shoppinglist:latest
```

#### Demo
If you want to try it out first, here is a **[demo](http://shoppinglistcn.netlify.app)**.

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
- Export: Save a backup of your database
- Import: Load a backup of your database
- Reset: Reset all items in your database (caution!)

This usage guide can be found in the info icon beside the app header, alongside a light/dark mode toggle.