# Twitter Mini

Multi-platform Twitter Client built with Electron

<a data-flickr-embed="true"  href="https://www.flickr.com/photos/140596581@N07/48150334916/in/dateposted-public/" title="Twitter Mini"><img src="https://live.staticflickr.com/65535/48150334916_bfaa4644b3_z.jpg" width="573" height="640" alt="Twitter Mini"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>

<a data-flickr-embed="true"  href="https://www.flickr.com/photos/140596581@N07/48150424072/in/dateposted-public/" title="Twitter Mini"><img src="https://live.staticflickr.com/65535/48150424072_a5ae1829ab_z.jpg" width="568" height="640" alt="Twitter Mini"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>

# Downloads
* :apple: macOS [Twitter.Mini-1.0.4.dmg](https://github.com/dongri/twitter-mini/releases/download/v1.0.4/Twitter.Mini-1.0.4.dmg)
* :penguin: Linux [twitter-mini_1.0.4_amd64.deb](https://github.com/dongri/twitter-mini/releases/download/v1.0.4/twitter-mini_1.0.4_amd64.deb)
* :briefcase: Windows [Twitter.Mini.Setup.1.0.4.exe](https://github.com/dongri/twitter-mini/releases/download/v1.0.4/Twitter.Mini.Setup.1.0.4.exe)

### brew install
```
$ brew tap dongri/homebrew-cask
$ brew cask install twitter-mini
```

# Development
```
$ node -v
v12.0.0

$ npm install

$ npm start
```

# Make app icons
```
$ npm i -g electron-icon-maker

$ ./make-icon.sh
```

# Packaging
```
$ npm run package-osx

$ npm run package-linux

$ npm run package-win
```

# brew cask
```
$ wget https://github.com/dongri/twitter-mini/releases/download/v1.0.4/Twitter.Mini-1.0.4.dmg
$ shasum -a 256 ~/Downloads/Twitter.Mini-1.0.4.dmg
cc7d3a2f63477fafbb9d85b565ae4c373504c6ad6ac36298b727fbf7dc1586fc  /Users/dongri/Downloads/Twitter.Mini-1.0.4.dmg

$ brew cask create twitter-mini
Editing /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask/Casks/twitter-mini.rb

$ vim /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask/Casks/twitter-mini.rb

cask 'twitter-mini' do
  version '1.0.3'
  sha256 'cc7d3a2f63477fafbb9d85b565ae4c373504c6ad6ac36298b727fbf7dc1586fc'

  url "https://github.com/dongri/twitter-mini/releases/download/v#{version}/Twitter.Mini-#{version}.dmg"
  appcast 'https://github.com/dongri/twitter-mini/releases.atom'
  name 'Twitter Mini'
  homepage 'https://github.com/dongri/twitter-mini'

  app 'Twitter Mini.app'
end

# fork Homebrew/homebrew-cask

$ cd homebrew-cask/Casks
$ cp /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask/Casks/twitter-mini.rb ./
$ git push origin master

# open pull request
```
