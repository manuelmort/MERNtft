import React from "react"
import axios from 'axios'
import { GiAlienBug } from 'react-icons/gi'

export default class LeaderBoard extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            players:[],
            refresh: false,
            load: false
        }
    }
    
    loadData() {
        axios.get("/tft-tournament")
			.then((res) => {
                this.setState({players:res.data})
                console.log(res.data)
                }
            ).catch((err) =>{
                console.log(err)
            })
    }
    refreshData() {
        axios.post("/tft-tournament").then(
            console.log("Data refreshed")
        ).catch((err) =>{
            console.log(err)
        })
    }

    render(){
        
        return(
            <div>
                <div className = "container text-center pt-5">
                    <div classname ="container text-center pt-3">

                        <h3 className="text-center text-light mt-1">
                            <div className="p-1 text-light">
                                <GiAlienBug/>
                            </div>
                            TFT LeaderBoard
                        </h3>

                    </div>

                    <button disabled = {this.state.load} className="btn btn-primary" 
                    onClick={
                        ()=>{this.loadData()
                        this.setState({load:true})
                    }
                    }> 
                    Load Data</button>

                    <button disabled = {this.state.refresh}className = "btn btn-danger" 
                    onClick= {
                        ()=> {
                          this.refreshData()
                          this.setState({refresh:true})
                    }
                    }> Refresh Data</button>
                    
                </div>

                


                <div className = "container mt-5">
                    <h3 className ="text-center text-danger"> MASTER </h3>
                    <div className = "container rounded">
                        <ol className ="list-group list-group-numbered">
                            {
                                
                                this.state.players.map((item)=> {
                                    
                                    if(item.tftTier === "MASTER"){
                                        return(
                                            <div className = "mx-auto justify-content-center text-center rounded border border-danger"
                                            style={{maxWidth:"500px", minWidth:"300px"}} key={item.id}>
                                                <li className ="list-group-item bg-transperant bg dark">

                                                    <p className ="text-light m-0">{item.name}</p>
                                                    <p className ="text-danger m-0">{item.tftTier + " " + item.tftRank}</p>
                                                    <p className ="text-muted m-0">{item.tftLp + " lp"}</p>
                                                </li>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </ol>
                    </div>
                </div>
                <div className = "container mt-5">
                    <h3 className ="text-center text-primary"> DIAMOND </h3>
                    <div className = "container rounded">
                        <ol className ="list-group list-group-numbered">
                            {
                                
                                this.state.players.map((item)=> {
                                    
                                    if(item.tftTier === "DIAMOND"){
                                        return(
                                            <div className = "mx-auto justify-content-center text-center rounded border border-primary"
                                            style={{maxWidth:"500px", minWidth:"300px"}} key={item.id}>
                                                <li className ="list-group-item bg-transperant bg dark">

                                                    <p className ="text-light m-0">{item.name}</p>
                                                    <p className ="text-primary m-0">{item.tftTier + " " + item.tftRank}</p>
                                                    <p className ="text-muted m-0">{item.tftLp + " lp"}</p>
                                                </li>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </ol>
                    </div>
                </div>
                   
                <div className = "container mt-5">
                    <h3 className ="text-center text-info"> PLATINUM </h3>
                    <div className = "container rounded">
                        <ol className ="list-group list-group-numbered">
                            {
                                
                                this.state.players.map((item)=> {
                                    
                                    if(item.tftTier === "PLATINUM"){
                                        return(
                                            <div className = "mx-auto justify-content-center text-center rounded border border-info"
                                            style={{maxWidth:"500px", minWidth:"300px"}} key={item.id}>
                                                <li className ="list-group-item bg-transperant bg dark">

                                                    <p className ="text-light m-0">{item.name}</p>
                                                    <p className ="text-info m-0">{item.tftTier + " " + item.tftRank}</p>
                                                    <p className ="text-muted m-0">{item.tftLp + " lp"}</p>
                                                </li>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </ol>
                    </div>
                </div>
                <div className = "container mt-5">
                    <h3 className ="text-center text-warning"> GOLD </h3>
                    <div className = "container rounded">
                        <ol className ="list-group list-group-numbered">
                            {
                                
                                this.state.players.map((item)=> {
                                    
                                    
                                    if(item.tftTier === "GOLD"){
                                        return(
                                            <div className = "mx-auto justify-content-center text-center rounded border border-warning"
                                            style={{maxWidth:"500px", minWidth:"300px"}} key={item.id}>
                                                <li className ="list-group-item bg-transperant bg dark">

                                                    <p className ="text-light m-0">{item.name}</p>
                                                    <p className ="text-warning m-0">{item.tftTier + " " + item.tftRank}</p>
                                                    <p className ="text-muted m-0">{item.tftLp + " lp"}</p>
                                                </li>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </ol>
                    </div>
                </div>
                <div className = "container mt-5">
                    <h3 className ="text-center text-muted">SILVER </h3>
                    <div className = "container rounded">
                        <ol className ="list-group list-group-numbered">
                            {
                                
                                this.state.players.map((item)=> {
                                    
                                    if(item.tftTier === "SILVER"){
                                        return(
                                            <div className = "mx-auto justify-content-center text-center rounded border border-muted"
                                            style={{maxWidth:"500px", minWidth:"300px"}} key={item.id}>
                                                <li className ="list-group-item bg-transperant bg dark">

                                                    <p className ="text-light m-0">{item.name}</p>
                                                    <p className ="text-muted m-0">{item.tftTier + " " + item.tftRank}</p>
                                                    <p className ="text-muted m-0">{item.tftLp + " lp"}</p>
                                                </li>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}