const PROXY_CONFIG = [
  {
    context: [
      "/Car",
    ],
    target: "https://localhost:5001",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
