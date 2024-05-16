import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'rsuite/dist/rsuite.min.css';
import { Form, ButtonToolbar, Button, Input, Col, Row, Grid, FlexboxGrid } from 'rsuite';
 
import Pusher from 'pusher-js';

function Result({wsHost, wsPort, cluster, subscribe, event}) {
  const [data, setData] = useState({})
  let client = new Pusher('app-key', {
    wsHost: wsHost,
    wsPort: wsPort,
    cluster: cluster,
    forceTLS: false,
    encrypted: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    logToConsole: true,
  })
  const channel = client.subscribe(subscribe)
  channel.bind(event, function (data) {
    console.log('Received', data)
    setData(data)
  })

  return (
    <div>
      connected
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )

}

function App() {
  const [wsHost, setWsHost] = useState('192.168.25.251');
  const [wsPort, setWsPort] = useState(6001);
  const [cluster, setCluster] = useState('mt1');
  const [subscribe, setSubscribe] = useState('test');
  const [event, setEvent] = useState('balance.update');
  const [key, setKey] = useState(0)


  return (
    <div style={{
    }}>
      
     
        <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <div>
              <h3>Config</h3>
            <Form>
          <Form.Group controlId="wsHost">
            <Form.ControlLabel>wsHost</Form.ControlLabel>
            <Form.Control name="wsHost" value={wsHost} onChange={(e)=>setWsHost(e)}  />
          </Form.Group>
          <Form.Group controlId="wsPort">
            <Form.ControlLabel>wsPort</Form.ControlLabel>
            <Form.Control name="wsPort" value={wsPort} onChange={(e)=>setWsPort(e)}  />
          </Form.Group>
          <Form.Group controlId="cluster">
            <Form.ControlLabel>cluster</Form.ControlLabel>
            <Form.Control name="cluster" value={cluster} onChange={(e)=>setCluster(e)}  />
          </Form.Group>
          <Form.Group controlId="subscribe">
            <Form.ControlLabel>subscribe (laravel channel name)</Form.ControlLabel>
            <Form.Control name="subscribe" value={subscribe} onChange={(e)=>setSubscribe(e)}  />
          </Form.Group>
          <Form.Group controlId="event">
            <Form.ControlLabel>event (broadcastAs / className)</Form.ControlLabel>
            <Form.Control name="event" value={event} onChange={(e)=>setEvent(e)}  />
          </Form.Group>
        
          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" onClick={()=>setKey(key+1)}>Submit</Button>
              <Button appearance="default">Cancel</Button>
            </ButtonToolbar>
          </Form.Group>
          </Form>
            </div>
          </Col>
          <Col xs={12}>
            <h3>Result</h3> <br />
            {key===0 && <div>Not Connected</div>}
            {key>0 && <Result wsHost={wsHost} wsPort={wsPort} cluster={cluster} subscribe={subscribe} event={event} />}
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default App
