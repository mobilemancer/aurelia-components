import { bindable, autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@autoinject
export class QaBot {
  @bindable name;
  @bindable secret;

  private question: string;
  private expressions: Array<Expression> = [];

  private get url() {
    return 'https://webchat.botframework.com/embed/' + this.name + '\\?s=' + this.secret;
  }

  constructor(private http: HttpClient) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(' https://westus.api.cognitive.microsoft.com/qnamaker/v1.0');
    });
  }


  private keyPressed(event) {
    if (event.keyCode === 13) {
      this.send();
    }
    return true;
  }

  public send() {
    var myHeaders = new Headers();
    myHeaders.append("Ocp-Apim-Subscription-Key", "39931b6971294fa398c52c54889c4136");

    var q = { "question": this.question };

    const request: RequestInit = {
      method: "POST",
      headers: myHeaders,
      cache: "no-cache",
      body: json(q)
    };

    this.expressions.push({ text: this.question, score: 100, type: "question" });

    this.http.fetch("/knowledgebases/905f81b1-af8d-4276-8194-8bf0f22ef8b2/generateAnswer", request)
      .then(response => response.json())
      .then(data => {
        this.expressions.push({ text: (<any>data).answer, score: (<any>data).score, type: "answer" });
        this.question = "";
        console.log(data);
      });
  }
}

interface Expression {
  text: string;
  score: number;
  type: string;
}