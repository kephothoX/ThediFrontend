import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'Thedi';



  async ngOnInit() {

    window.localStorage.setItem('CustomerDID', 'did:dht:rr1w5z9hdjtt76e6zmqmyyxc5cfnwjype6prz45m6z1qsbm8yjao');

    window.localStorage.setItem('PFIDid', 'did:dht:3fkz5ssfxbriwks3iy5nwys3q5kyx64ettp9wfn1yfekfkiguj1y');

    //const { did: aliceBearerDid } = await web5.agent.identity.get({ didUri: `${ window.localStorage.getItem('CustomerDID')}` });


    /*await fetch('https://3000-idx-blox-1730030534735.cluster-qtqwjj3wgzff6uxtk26wj7fzq6.cloudworkstations.dev/issuerDid', {
      method: 'GET',
      mode: 'no-cors'

    })
    .then(async (response: any) => {
      const data = await response();
      console.log(response);
    })*/

  }
}
