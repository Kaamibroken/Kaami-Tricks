{
  "version": 2,
  "builds": [
    { "src": "index.html", "use": "@vercel/static" },
    { "src": "tool.html", "use": "@vercel/static" },
    { "src": "jazztv.html", "use": "@vercel/static" },
    { "src": "jazz.html", "use": "@vercel/static" },
    { "src": "zong.html", "use": "@vercel/static" },
    { "src": "ads.html", "use": "@vercel/static" },
    { "src": "sports.html", "use": "@vercel/static" },
    { "src": "channels.js", "use": "@vercel/static" },
    { "src": "jazz.js", "use": "@vercel/static" },
    { "src": "sports.js", "use": "@vercel/static" },
    { "src": "file.html", "use": "@vercel/static" },
    { "src": "fake.html", "use": "@vercel/static" },
    { "src": "public/ads.txt", "use": "@vercel/static" },
    { "src": "images/**", "use": "@vercel/static" },
    { "src": "database.js", "use": "@vercel/node" },
    { "src": "fake.js", "use": "@vercel/node" },
    { "src": "database.html", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/", "dest": "/index.html" },
    { "src": "/", "dest": "/tool.html" },
    { "src": "/", "dest": "/jazztv.html" },
    { "src": "/", "dest": "/jazz.html" },
    { "src": "/", "dest": "/zong.html" },
    { "src": "/", "dest": "/file.html" },
    { "src": "/channels.js", "dest": "/channel.js" },
    { "src": "/jazz.js", "dest": "/jazz.js" },
    { "src": "/temp.html", "dest": "/temp.html" },
    { "src": "/sports.js", "dest": "/sports.js" },
    { "src": "/ads.txt", "dest": "/public/ads.txt" },
    { "src": "/", "dest": "/sports.html" },
    { "src": "/api/fake", "dest": "/fake.js" },
    { "src": "/api/(.*)", "dest": "/fake.js" },
    { "src": "/", "dest": "/fake.html" }
  ]
}




