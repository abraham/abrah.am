/* eslint-env node */

import * as fs from 'fs';
import * as path from 'path';
import Twit from 'twit';

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

if (!consumerKey || !consumerSecret) {
  throw new Error('Missing CONSUMER_KEY/CONSUMER_SECRET');
}

const filePath = path.resolve('./src/index.json');
const data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
const T = new Twit({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  app_only_auth: true,
  strictSSL: true,
});
const params = {
  screen_name: 'abraham',
  count: 25,
  include_entities: true,
  tweet_mode: 'extended',
  include_rts: false,
  exclude_replies: true,
};
T.get('statuses/user_timeline', params, (error, tweets) => {
  if (error) {
    throw new Error(error);
  } else {
    data.tweets = tweets.slice(0, 6);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
});
