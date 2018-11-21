import { dialogflow, Image } from 'actions-on-google';

const app = dialogflow();

app.intent('Default Welcome Intent', conv => {
  conv.ask('Hi, how is it going?');
  conv.ask(`Here's a picture of a cat`);
  conv.ask(
    new Image({
      url:
        'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
      alt: 'A cat',
    }),
  );
});

app.intent('FinishIntent', conv => {
  conv.close('See you later');
});

app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand. Can you tell me something else?`);
});

app.intent('HelloIntent', conv => {
  conv.ask('Hello Google Home!');
});

export default app;
