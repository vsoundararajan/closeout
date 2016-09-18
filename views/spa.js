const Closeout = React.createClass({
  getInitialState: function(){
     var today = getToday();
     var store = Data[0].name;
     console.log("store = " + store);
     return {
       selectedStore: store,
       posted: -999.99,
       date: '',
       closeoutRows: [],
       closeoutCurrentRow: {},
       denominations: [],
       filename: "closeout.csv",
       emptydenominations: [{qty: 0, currency: 100, product: 0.00}, 
                         {qty: 0, currency:  50, product: 0.00}, 
                         {qty: 0, currency:  20, product: 0.00}, 
                         {qty: 0, currency:  10, product: 0.00}, 
                         {qty: 0, currency:   5, product: 0.00}, 
                         {qty: 0, currency:   2, product: 0.00}, 
                         {qty: 0, currency:   1, product: 0.00}
                        ],
     };
  },
  postedChangeHandler: function(posted){
     this.state.posted = posted;
  },
  filenameChangeHandler: function(filename){
     this.setState({filename: filename});
  },
  closeoutDateChangeHandler: function(closeoutdate){
     this.state.date = closeoutdate;
     //console.log('closeoutDateChangeHandler ==> ' + closeoutdate + " this.state.date = " + this.state.date);
  },
  validateEntries: function(){
    var retValue = true;
    if(this.state.date !== '' && this.state.posted >= 0.00 && this.state.denominations.length > 0
       && this.state.selectedStore !== 'Select'){
      //console.log("returning true " + this.state.date + "  " + this.state.posted);
      retValue = true;
    }else{
      //console.log("returning false");
      retValue = false
    }
    return retValue;
  },
  clearEntries: function(){
     var store = Data[0].name;
     console.log("clearing the entries " + store);
     this.setState({
       selectedStore: store,
       posted: -999.99,
       date: '',
       closeoutCurrentRow: {},
       denominations: [],
       emptydenominations: [{qty: 0, currency: 100, product: 0.00}, 
                         {qty: 0, currency:  50, product: 0.00}, 
                         {qty: 0, currency:  20, product: 0.00}, 
                         {qty: 0, currency:  10, product: 0.00}, 
                         {qty: 0, currency:   5, product: 0.00}, 
                         {qty: 0, currency:   2, product: 0.00}, 
                         {qty: 0, currency:   1, product: 0.00}
                        ]
     });
  },
  submitClickHandler: function(){
    if(this.validateEntries() === true){
      console.log("submitClickHandler => " + printArr(this.state.denominations));
      var ttt = printArr(this.state.denominations);
      var actual = getSum(ttt);
      var temp = {store: this.state.selectedStore, posted: this.state.posted, denominations: this.state.denominations};
      this.setState( { closeoutCurrentRow: temp} );
      var temp2 = {id: (this.state.closeoutRows.length + 1), store: this.state.selectedStore, date: this.state.date, posted: this.state.posted, denominations: ttt, actual: actual};
      this.state.closeoutRows.push(temp2);
      this.clearEntries();
    }else{
      alert("Invalid " + this.state.date);
    }
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
             <Store storename={store.name} key={store.id} selectedStore={this.state.selectedStore}/>
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
                 <CloseoutDateInput label="CloseoutDate" value={this.state.date} onChange={this.closeoutDateChangeHandler}/>
              </div>
              <div className="col-md-3">
                  <PostedCloseoutInput label="Posted:" onChange={this.postedChangeHandler}/>
              </div>               
          </div>
          <hr/> 
          <Denominations onChange={this.denominationsChangeHandler} initvalue={this.state.emptydenominations}/> 
          <hr />
          <div className="col-md-3">
              <button className="btn btn-danger" onClick={this.submitClickHandler}>Submit</button>
          </div> 
          <br />
          <hr />
          <PostedCloseoutInput label="FileName:" onChange={this.filenameChangeHandler}/>
          <BootstrapTable data={this.state.closeoutRows} striped={true} hover={true} exportCSV={true} csvFileName={this.state.filename}>
            <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
            <TableHeaderColumn dataField="store" isKey={false} dataAlign="center" dataSort={true}>Store</TableHeaderColumn>
            <TableHeaderColumn dataField="date" isKey={false} dataSort={true}>Date</TableHeaderColumn>
            <TableHeaderColumn dataField="posted" isKey={false} >Posted</TableHeaderColumn>
            <TableHeaderColumn dataField="actual" isKey={false} >Counted</TableHeaderColumn>
            <TableHeaderColumn dataField="denominations" isKey={false}>Denominations</TableHeaderColumn>
         </BootstrapTable>     
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
         denominations: this.props.initvalue,
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

      if(this.props.selectedStore === this.props.storename)
        return(
               <option selected>{this.props.storename}</option>
        );
      else
        return(
               <option>{this.props.storename}</option>
        );
    },
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
            Date: ''
          }
        );
    },
    handleChange: function(event){
      this.props.onChange(event.target.value);
      this.setState({Date: event.target.value});
    },
    render: function(){
        return(
            <div class="input-group">
                <span class="input-group-addon">{this.props.label}</span>
                <input type="text" class="form-control" placeholder="close out date"  onChange={this.handleChange} />
            </div>
        );
    },
});



ReactDOM.render(
    <Closeout />,
    document.getElementById('content')
);

// ReactDOM.render(
//     <Denominations />,
//     document.getElementById('denoms')
// );
