var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var Path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/docs/',
    filename: 'index.bundle.js'
  },
  module: {
    rules: [{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
            loader: 'babel-loader'
          }
          /*, {
                    loader: 'eslint-loader',
                    options: {
                      emitWarning: true
                    }
                  }*/
        ]
      },
      {
        test: /\.(png|woff(2)?|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.pdf$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      "TweenLite": Path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      "TweenMax": Path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      "TimelineLite": Path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      "TimelineMax": Path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      "ScrollMagic": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      "animation.gsap": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
      "debug.addIndicators": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CruzHacks 2018 | All Inclusive Hackathon in Santa Cruz',
      //favicon: __dirname + '/images/favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeAttributeQuotes: true,
        useShortDoctype: true,
        minifyCSS: true
      },
      template: './src/index.html'
    }),
    new ExtractTextPlugin("style.css"),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      }
    }),
    //new UglifyJSPlugin()
  ]
}
