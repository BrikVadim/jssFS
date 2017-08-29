class File {
  constructor(name, data = "") {
    this.name = name
    this.data = data
    this.eattributes = {
      hidden: false
    }
  }
  
  write(data) {
    this.data += data
    return this
  }
  
  read() {
    return this.data
  }
  
  get size() {
    return this.data.length
  }
  
  hide() {
    this.eattributes.hidden = true
    return this
  }
  
  toString() {
    return this.data
  }
}

const Unitype = object => object instanceof Object ? object.constructor.name : ({}.toString.call(object)).slice(8, -1).toLowerCase();

class Folder {
  constructor(name, path) {
    this.name = name 
    this.fpath = new Array(...path)
    this.fpath.push(name)
    this.eattributes = {
      hidden: false
    }
  }
  
  appendFile(file) {
    this[file.name] = file
  }
  
  createFile(name) {
    let file = new File(name)
    this.appendFile(file)
    return file
  }
  
  readFile(fileName) {
    return this[fileName].read()
  }
  
  createFolder(name) {
    let floder = new Folder(name, this.fpath)
    this.appendFile(floder)
    return floder
  }
  
  get path() {
    return this.fpath.join('/')
  }
  
  hide() {
    this.eattributes.hidden = true;
  }
  
  list() {
    for (let file in this) {
      if (this[file].eattributes) {
        if (this[file].eattributes.hidden === false) {
          switch (Unitype(this[file])) {
            case 'Folder':
              console.log(file + '/')
              break
            case 'File':
              console.log(file, '('+this[file].size+' bytes)')
              break
          }
        }
      }
    }
  }
}

class jssFS {
  constructor(name) {
    this.name = name
    this.root = new Folder('', [])
  }
  
  serialize() {
    return JSON.stringify(this)
  }
  
  save() {
    localStorage[this.name] = this.serialize()
  }
  
  load() {
    this.root = JSON.parse(localStorage[this.name]).root
    this.root.__proto__ = Folder.prototype
    
    for (let node in this.root) {
      
      if (this.root[node].fpath) {
        this.root[node].__proto__ = Folder.prototype
      }
      
      if (this.root[node].data !== undefined) {
        this.root[node].__proto__ = File.prototype
      }
    }
    
  }
}
