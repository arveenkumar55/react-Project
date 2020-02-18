import React from 'react'
import Progressbar from './Progressbar'
//import ProgressBarPage from './ProgressBarPage'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      dataList:'',
      percentageList: [],
      selectedIndex: 0,     
    }
  }

 buttonClick = (value) => {
      let percentageList = this.state.percentageList
      let dataList = this.state.dataList
      dataList[this.state.selectedIndex] = dataList[this.state.selectedIndex]+value
      if(dataList[this.state.selectedIndex] < 0) {
        dataList[this.state.selectedIndex] = 0
      }
      console.log(dataList)
      this.setState({dataList: dataList})
      let percentage = Math.round ((dataList[this.state.selectedIndex]/this.state.data.limit)*100)
      percentageList[this.state.selectedIndex] = percentage
      this.setState({percentageList: percentageList})
  }
  typeHandleChange = (e) => {
     console.log(e.target.value)
     this.setState({selectedIndex: e.target.value})
  }
componentDidMount() {
    fetch('http://pb-api.herokuapp.com/bars')
    .then(res => res.json())
    .then((data) => {
      let percentageList = []
      for(let i=0; i<data.bars.length; i++) {
        let percentage = (data.bars[i]/data.limit)*100
        percentageList.push(Math.round(percentage))
      }
      this.setState({dataList:data.bars, data:data, percentageList:percentageList})
    })
    .catch(console.log)
  }

  render() {
    return (
      <div>
        {
          this.state.data && this.state.data.bars.map((bar,index) => {
            return <Progressbar key= {index} percentage= {this.state.percentageList[index]} data= {this.state.dataList[index]} limit= {this.state.data.limit}/> 
          })
        }
        {
          this.state.data && 
          <div style={{maxWidth:'50%', marginTop:'2%', marginLeft:'auto', marginRight:'auto'}}>
          <select className='custom-select' id='type'  style={{ width: '150px'}} tabIndex='-98'  onChange={this.typeHandleChange}>
          {
          this.state.data.bars.map((bar,index) => {
            return <option key={index} value={index}>{`#ProgressBar${index+1}`}</option>            
          })
          }
        </select> 
        {
          this.state.data && this.state.data.buttons.map((button,index) => {
            return <button style={{marginLeft:'30px'}} key= {index} onClick={() => this.buttonClick(button)}> {button}</button>
          })
        }
        </div>
        }
        
      </div>
    )
  }
}

export default App;
