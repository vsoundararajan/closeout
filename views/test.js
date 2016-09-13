const Closeout = React.createClass({
  getInitialState: function(){
     var today = getToday();
     return {
       selectedStore: "-----",
       posted: 0.00,
       date: today,
       closeoutRows: [],
       closeoutCurrentRow: {},
       denominations: []
     };
  },
  postedChangeHandler: function(posted){
     this.state.posted = posted;
  },
  closeoutDateChangeHandler: function(closeoutdate){
     this.state.date = closeoutdate;
     console.log('closeoutDateChangeHandler ==> ' + closeoutdate + " this.state.date = " + this.state.date);
  },
  submitClickHandler: function(){
    console.log("submitClickHandler => " + printArr(this.state.denominations));
    var ttt = printArr(this.state.denominations);
    var temp = {store: this.state.selectedStore, posted: this.state.posted, denominations: this.state.denominations};
    this.setState( { closeoutCurrentRow: temp} );
    var temp2 = {store: this.state.selectedStore, date: this.state.date, posted: this.state.posted, denominations: ttt};
    this.state.closeoutRows.push(temp2)
  },
  changeStoreHandler: function(event){
    this.setState({ selectedStore: event.target.value});
  },
  denominationsChangeHandler: function(denoms){
     console.log("denominationsChangeHandler => " + printArr(denoms));
     this.setState( {denominations: denoms });
  },
  render: function(){
    const stores = Data.map( (store) => {
           return(
             <Store storename={store.name} key={store.id} />
           );
    });
    return(
        <div className="container">
          <div className="row">
              <div className="col-md-3">
                <div>
                  <span>Select a store:</span>
                  <select class="selectpicker" onChange={this.changeStoreHandler}>
                      <optgroup label="Stores">
                            {stores}
                      </optgroup>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                 <CloseoutDateInput label="CloseoutDate" onChange={this.closeoutDateChangeHandler}/>
              </div>
              <div className="col-md-3">
                  <PostedCloseoutInput label="Posted:" onChange={this.postedChangeHandler}/>
              </div>
              <div className="col-md-3">
                  <button onClick={this.submitClickHandler}>Submit</button>
              </div>                
          </div>
          <hr/> 
          <Denominations onChange={this.denominationsChangeHandler}/> 
          <hr />
          <CloseoutTable closeoutRows={this.state.closeoutRows}/>       
        </div>
      );
  }
});

const printArr = function (arr){
  var string = "";
  arr.forEach( (item) => {
    string += item.currency + "," + item.qty + "," + item.product + "]"
  });
  return string;
}

const getSum = function (a){
  var sum = 0.00
  a.split("]").forEach((item) => { 
       if(item !== ""){
         sum += parseInt(item.split(",")[2]);
       }
    }
  );
  return sum;
}

const getToday = function (){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd
  } 
  if(mm<10){
      mm='0'+mm
  } 
  var today = dd+'/'+mm+'/'+yyyy;
  return today;
}

const Denominations = React.createClass({
   
    handleQtyChange: function (event){
      //alert(event.target.value);
      var total = 0.00;
      var newdenoms = this.state.denominations.map( (item)  => {

         if(item.currency == event.target.id && event.target.value >= 0){
           //alert(item.currency + " == " + event.target.id); 
           item.qty = event.target.value;
           
         }
         item.product = item.qty * item.currency;
         total += item.product;
         return item;
      });
      this.setState({denominations: newdenoms, total: total});
      this.props.onChange(this.state.denominations);
    },
    getInitialState: function(){
       return {
         denominations: [{qty: 0, currency: 100, product: 0.00}, 
                         {qty: 0, currency:  50, product: 0.00}, 
                         {qty: 0, currency:  20, product: 0.00}, 
                         {qty: 0, currency:  10, product: 0.00}, 
                         {qty: 0, currency:   5, product: 0.00}, 
                         {qty: 0, currency:   2, product: 0.00}, 
                         {qty: 0, currency:   1, product: 0.00}
                        ],
         total: 0.00
       };
    },
    render: function(){
       return(
           <div className="container">
             <div className="row">
                <div className="well">
                    <div className="col-sm-3"><input type="number" id={this.state.denominations[0].currency} value={this.state.denominations[0].qty} onChange={this.handleQtyChange}/></div>
                    <div className="col-sm-1">X</div>
                    <div className="col-sm-3"><input type="number" value={this.state.denominations[0].currency} /></div>
                    <div className="col-sm-1">=</div>
                    <div className="col-sm-4"><input type="number" value={this.state.denominations[0].product} /></div>
                </div>
                <div className="well">
                    <div className="col-sm-3"><input type="number" id={this.state.denominations[1].currency} value={this.state.denominations[1].qty} onChange={this.handleQtyChange}/></div>
                    <div className="col-sm-1">X</div>
                    <div className="col-sm-3"><input type="number" value={this.state.denominations[1].currency} /></div>
                    <div className="col-sm-1">=</div>
                    <div className="col-sm-4"><input type="number" value={this.state.denominations[1].product} /></div>
                </div>
                <div className="well">
                    <div className="col-sm-3"><input type="number" id={this.state.denominations[2].currency} value={this.state.denominations[2].qty} onChange={this.handleQtyChange}/></div>
                    <div className="col-sm-1">X</div>
                    <div className="col-sm-3"><input type="number" value={this.state.denominations[2].currency} /></div>
                    <div className="col-sm-1">=</div>
                    <div className="col-sm-4"><input type="number" value={this.state.denominations[2].product} /></div>
                </div>
                <div className="well">
                    <div className="col-sm-3"><input type="number" id={this.state.denominations[3].currency} value={this.state.denominations[3].qty} onChange={this.handleQtyChange}/></div>
                    <div className="col-sm-1">X</div>
                    <div className="col-sm-3"><input type="number" value={this.state.denominations[3].currency} /></div>
                    <div className="col-sm-1">=</div>
                    <div className="col-sm-4"><input type="number" value={this.state.denominations[3].product} /></div>
                </div>
                <div className="well">
                    <div className="col-sm-3"><input type="number" id={this.state.denominations[4].currency} value={this.state.denominations[4].qty} onChange={this.handleQtyChange}/></div>
                    <div className="col-sm-1">X</div>
                    <div className="col-sm-3"><input type="number" value={this.state.denominations[4].currency} /></div>
                    <div className="col-sm-1">=</div>
                    <div className="col-sm-4"><input type="number" value={this.state.denominations[4].product} /></div>
                </div>
                <div className="well">
                    <div className="col-sm-3"><input type="number" id={this.state.denominations[5].currency} value={this.state.denominations[5].qty} onChange={this.handleQtyChange}/></div>
                    <div className="col-sm-1">X</div>
                    <div className="col-sm-3"><input type="number" value={this.state.denominations[5].currency} /></div>
                    <div className="col-sm-1">=</div>
                    <div className="col-sm-4"><input type="number" value={this.state.denominations[5].product} /></div>
                </div>
                <div className="well">
                    <div className="col-sm-3"><input type="number" id={this.state.denominations[6].currency} value={this.state.denominations[6].qty} onChange={this.handleQtyChange}/></div>
                    <div className="col-sm-1">X</div>
                    <div className="col-sm-3"><input type="number" value={this.state.denominations[6].currency} /></div>
                    <div className="col-sm-1">=</div>
                    <div className="col-sm-4"><input type="number" value={this.state.denominations[6].product} /></div>
                </div>
             </div> 
             <div className="row">
                <div className="col-sm-4 col-sm-offset-7">
                   <AmountInput label="Actual:" value={this.state.total}/>
                </div>
             </div>
           </div>
       );
    },
});

const Store = React.createClass({
    render: function(){
        return(
            <option>{this.props.storename}</option>
        );
    },
});

const CloseoutTable = React.createClass({
    render: function(){
      const closeouttablerows = this.props.closeoutRows.map(  (item, index) => {
           //console.log(printArr(item.denominations));
           //var denomsStr = printArr(item.denominations);
           var denomsStr = item.denominations;
           return(
              <CloseoutThs store={item.store} date={item.date} posted={item.posted} denominations={denomsStr} key={index}/>
            );
      });
      return (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Store</th>
              <th>Date</th>
              <th>Posted</th>
              <th>Counted</th>
              <th>Denominations</th>
            </tr>
          </thead>
          <tbody>
              {closeouttablerows}
          </tbody>
        </table>
      );
    }
});

const CloseoutThs = React.createClass({
    editClickHandler: function(){
      console.log('Edit icon is clicked ' + this.props.store + " " + this.props.date);
    },
    removeClickHandler: function(store, date){
      console.log('Remove icon is clicked ' + this.props.store + " " + this.props.date);
    },
    render: function(){
      //alert("store = " + this.props.store + " posted = " + this.props.posted);
      return (
          <tr>
             <th>
               {this.props.store}
             </th>
             <th>
               {this.props.date}
             </th>
             <th>
               {this.props.posted}
             </th>
             <th>
               {getSum(this.props.denominations)}
             </th>
             <th>
               {this.props.denominations}
             </th>
             <th>
                <span className="glyphicon glyphicon-edit" onClick={this.editClickHandler}></span> 
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="glyphicon glyphicon-remove" onClick={this.removeClickHandler}></span> 
             </th>
          </tr>
        );
    }
});


const AmountInput = React.createClass({
    render: function(){
        return(
            <div class="input-group">
                <span class="input-group-addon">{this.props.label} $</span>
                <input type="text" class="form-control" placeholder="Amount" value={this.props.value}/>
            </div>
        );
    },
});

const PostedCloseoutInput = React.createClass({
    getInitialState: function(){
      return(
          {
            amount: 0.00
          }
        );
    },
    handleChange: function(event){
      this.setState({amount: event.target.value});
      this.props.onChange(this.state.amount);
    },
    render: function(){
        return(
            <div class="input-group">
                <span class="input-group-addon">{this.props.label} $</span>
                <input type="text" class="form-control" placeholder="Amount" value={this.state.amount} onChange={this.handleChange}/>
            </div>
        );
    },
});


const CloseoutDateInput = React.createClass({
    getInitialState: function(){
      var today = getToday();
      return(
          {
            Date: today
          }
        );
    },
    handleChange: function(event){
      this.setState({Date: event.target.value});
      this.props.onChange(event.target.value);
    },
    render: function(){
        return(
            <div class="input-group">
                <span class="input-group-addon">{this.props.label}</span>
                <input type="text" class="form-control" placeholder="close out date" value={this.state.date} onChange={this.handleChange}/>
            </div>
        );
    },
});


const StoreList = React.createClass({
    render: function(){
        const stores = Data.map( (store) => {
           return(
             <Store storename={store.name} key={store.id} />
           );
        });
        return(
            <div>
                <span>Select a store:</span>
                <select class="selectpicker" onChange={this.changeStoreHandler}>
                    <optgroup label="Stores">
                          {stores}
                    </optgroup>
                </select>
            </div>
        );
    }
});



ReactDOM.render(
    <Closeout />,
    document.getElementById('content')
);

// ReactDOM.render(
//     <Denominations />,
//     document.getElementById('denoms')
// );

