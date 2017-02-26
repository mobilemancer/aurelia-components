import { bindable, autoinject } from 'aurelia-framework';
import { BindingEngine } from 'aurelia-binding';
import { HttpClient, json } from 'aurelia-fetch-client';

const API_URL = "https://westus.api.cognitive.microsoft.com/qnamaker/v1.0";
const SUBSCRIPTION_KEY = "39931b6971294fa398c52c54889c4136";
const KB_ID = "905f81b1-af8d-4276-8194-8bf0f22ef8b2";
const ENTER_KEY = 13;

@autoinject
export class QaBot {
  private question: string;
  private expressions: Array<Expression> = [];
  private chatArea: HTMLElement;
  private subscription: any;

  constructor(private http: HttpClient, private bindingEngine: BindingEngine) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(API_URL);
    });
  }

  attached() {
    this.subscription = this.bindingEngine.propertyObserver(this.chatArea, 'scrollHeight').subscribe((newValue, oldValue) => this.scrollChatArea());
  }

  detached() {
    this.subscription.dispose();
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
    this.http.fetch(`/knowledgebases/${KB_ID}/generateAnswer`, request)
      .then(response => response.json())
      .then((data: any) => {
        this.expressions.push({ text: data.answer.replace("\n", "<br>"), score: data.score, type: "answer" });
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