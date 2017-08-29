# jssFS
JavaScript localStorage file system

```
let fs = new jssFS('fs') // create new file system with name fs

fs.root.createFile('test.txt', 'Test file... 123 TEST!') // create new file test.txt  in root
fs.root.createFolder('new_folder') // create new folder in root

fs.root.new_folder.createFile('readme.md', '#jssFS') // create new file in new_folder

fs.root.createFolder('passwords').createFile('system.pswd', 'qwerty12345').hide() // create new folder in root and create new hidden file in passwords

fs.root.list() // print files in root
fs.root.passwords.list() // print files in passwords

fs.save() // save to localStorage[fs_name]
```
