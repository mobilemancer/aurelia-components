import { bindable, autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { BindingEngine } from 'aurelia-binding';

const SUBSCRIPTION_KEY = "39931b6971294fa398c52c54889c4136";
const QNA_ADDRESS = "/knowledgebases/905f81b1-af8d-4276-8194-8bf0f22ef8b2/generateAnswer";
const ENTER_KEY = 13;

@autoinject
export class QaBot {
  private question: string;
  private expressions: Array<Expression> = [];
  private chatArea;

  constructor(private http: HttpClient, private bindingEngine: BindingEngine) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://westus.api.cognitive.microsoft.com/qnamaker/v1.0');
    });
  }

  attached() {
    let subscription = this.bindingEngine.propertyObserver(this.chatArea, 'scrollHeight')
      .subscribe((newValue, oldValue) => this.scrollChatArea());
  }

  private keyPressed(event) {
    if (event.keyCode === ENTER_KEY) {
      this.send();
    }
    return true;
  }

  private send() {
    const headers = new Headers();
    headers.append("Ocp-Apim-Subscription-Key", SUBSCRIPTION_KEY);
    headers.append("Content-Type", "application/json");

    const question = { "question": this.question };

    const request: RequestInit = {
      method: "POST",
      headers: headers,
      cache: "no-cache",
      body: json(question)
    };

    this.expressions.push({ text: this.question, score: 100, type: "question" });

    this.http.fetch(QNA_ADDRESS, request)
      .then(response => response.json())
      .then((data: any) => {
        this.expressions.push({ text: data.answer, score: data.score, type: "answer" });
        this.clearQuestionField();
      });
  }

  private scrollChatArea() {
    this.chatArea.scrollTop = this.chatArea.scrollHeight;
  }

  private clearQuestionField() {
    this.question = "";
  }
}

interface Expression {
  text: string;
  score: number;
  type: string;
}