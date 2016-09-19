const Closeout = React.createClass({
  getInitialState: function(){
     var today = getToday();
     var store = Data[0].name;
     //console.log("store = " + store);
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
       notes: ''
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
  notesChangeHandler: function(notes){
     this.state.notes = notes;
  },
  validateEntries: function(){
    var duplicateRecord = this.doesExist(this.state.selectedStore, this.state.date);
    // console.log("duplicateRecord = " + duplicateRecord + " this.state.date = " + this.state.date + " this.state.posted = "+ this.state.posted);
    // console.log("printArr(this.state.denominations) = " + printArr(this.state.denominations));
    if(duplicateRecord){
      //alert("Duplicate record");
      return false;
    }
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
  doesExist: function(store, date){
     var retVal = false;
     //console.log("inside doesExist store = " + store + "  Date = " + date);
     this.state.closeoutRows.forEach( (item) => {
       //console.log("inside forEach item.store = " + item.store + "  item.Date = " + item.date);
       if(item.store === store && item.date === date){
         retVal = true;
         //break;
       }
     
    });
     return retVal;
  },
  clearEntries: function(){
     var store = Data[0].name;
     //console.log("clearing the entries " + store);
     this.myCloseoutDateInput.handleSubmit();
     this.myPostedCloseoutInput.handleSubmit();
     this.myDenominations.handleSubmit();
     this.myNotesText.handleSubmit();
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
                        ],
       notes: '',
     });
  },
  submitClickHandler: function(doNotClear){
    if(this.validateEntries() === true){
      //console.log("submitClickHandler => " + printArr(this.state.denominations));
      var ttt = printArr(this.state.denominations);
      var actual = getSum(ttt);
      var temp = {store: this.state.selectedStore, posted: this.state.posted, denominations: this.state.denominations};
      //console.log("at submitClickHandler, temp.store = " + temp.store, " temp.posted = " + temp.posted );

      this.setState( { closeoutCurrentRow: temp} );


         //console.log(this.state.closeoutCurrentRow);

      //console.log("at submitClickHandler  end");

      var temp2 = {id: (this.state.closeoutRows.length + 1), store: this.state.selectedStore, date: this.state.date, posted: this.state.posted, denominations: ttt, actual: actual, notes: this.state.notes};
      this.state.closeoutRows.push(temp2);
      this.clearEntries();

    }else{
      alert("Please fill out all the required fields. Check for Duplicate.");
    }
  },
  changeStoreHandler: function(event){
    this.setState({ selectedStore: event.target.value});
  },
  denominationsChangeHandler: function(denoms){
     //console.log("denominationsChangeHandler => " + printArr(denoms));
     this.setState( {denominations: denoms });
  },
  buttonFunction: function(cell, row) {      
  return <label>
            <button type="button" 
                    onClick={() => {this.deleteRow(row)}} 
                    className="bbtn btn-danger btn-sm glyphicon glyphicon-remove">
                      
            </button>
         </label>        
 },
  deleteRow: function(row){
     var newCloseOutRows = [];
     this.state.closeoutRows.forEach( (item) => {
       if(item.store === row.store && item.date === row.date){
         
       }else{
        newCloseOutRows.push(item);
       }
    });
    this.setState({closeoutRows: newCloseOutRows});
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
                 <CloseoutDateInput label="CloseoutDate" placeholder="Enter Date" size="11" value={this.state.date} onChange={this.closeoutDateChangeHandler} ref={(ref) => this.myCloseoutDateInput = ref}/>
              </div>
              <div className="col-md-3">
                  <PostedCloseoutInput label="Posted:" onChange={this.postedChangeHandler} ref={(ref) => this.myPostedCloseoutInput = ref}/>
              </div>               
          </div>
          <hr/> 
          <Denominations onChange={this.denominationsChangeHandler} initvalue={this.state.emptydenominations} ref={(ref) => this.myDenominations = ref}/> 
          <hr />
          <div className="col-md-3">
              <button className="btn btn-danger" onClick={this.submitClickHandler}>Submit</button>
          </div> 
          <br />
          <CloseoutDateInput label="Notes:" size="100"  placeholder="Enter Notes"  onChange={this.notesChangeHandler} ref={(ref) => this.myNotesText = ref}/>
          <hr />
          <PostedCloseoutInput label="FileName:" onChange={this.filenameChangeHandler}/>
          <BootstrapTable data={this.state.closeoutRows} striped={true} hover={true} exportCSV={true} csvFileName={this.state.filename}>
            <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
            <TableHeaderColumn dataField="store" isKey={false} dataAlign="center" dataSort={true}>Store</TableHeaderColumn>
            <TableHeaderColumn dataField="date" isKey={false} dataSort={true}>Date</TableHeaderColumn>
            <TableHeaderColumn dataField="posted" isKey={false} >Posted</TableHeaderColumn>
            <TableHeaderColumn dataField="actual" isKey={false} >Counted</TableHeaderColumn>
            <TableHeaderColumn dataField="denominations" isKey={false}>Denominations</TableHeaderColumn>
            <TableHeaderColumn dataField="notes" isKey={false}>Notes</TableHeaderColumn>
            <TableHeaderColumn  isKey={false} dataFormat={this.buttonFunction} >Edit/Delete</TableHeaderColumn>
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

const toDenoms = function(denoms){
  // console.log("at toDenoms denoms = " + denoms);
  var arr = denoms.split("]");
  var newDenoms = [];
  arr.forEach( (item) => {
    var a = item.split(",");
    if(a.length > 1)
       newDenoms.push({qty: a[1], currency:  a[0], product: a[2]});
  });
  // console.log("at toDenoms printing the returning array");
  // newDenoms.forEach( (item) => {
  //   console.log(item);
  // });
  // console.log("at toDenoms printing the returning array end");
  return newDenoms;

}
const Denominations = React.createClass({
    handleSubmit: function(){
      //console.log("handleSubmit of Denominations");
      this.setState({denominations: [{qty: 0, currency: 100, product: 0.00}, 
                         {qty: 0, currency:  50, product: 0.00}, 
                         {qty: 0, currency:  20, product: 0.00}, 
                         {qty: 0, currency:  10, product: 0.00}, 
                         {qty: 0, currency:   5, product: 0.00}, 
                         {qty: 0, currency:   2, product: 0.00}, 
                         {qty: 0, currency:   1, product: 0.00}
                        ], total: 0.00})
    },
    handleQtyChange: function (event){
      //alert(event.target.value);
      var total = 0.00;
      var newdenoms = this.state.denominations.map( (item)  => {
          if(item.product !== undefined){
             if(item.currency == event.target.id && event.target.value >= 0){
               //alert(item.currency + " == " + event.target.id); 
               item.qty = event.target.value;
               
             }
             item.product = item.qty * item.currency;
             total += parseInt(item.product);
         }
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
                    <div className="col-sm-3"><label>{this.state.denominations[0].currency} </label></div>
                    <div className="col-sm-1">=</div>
                    <div className="col-sm-4"><label>{this.state.denominations[0].product} </label></div>
                </div>
                <div className="well">
                    <div className="col-sm-3"><input type="number" id={this.state.denominations[1].currency} value={this.state.denominations[1].qty} onChange={this.handleQtyChange}/></div>
                    <div className="col-sm-1">X</div>
                    <div className="col-sm-3"><label>{this.state.denominations[1].currency} </label></div>
                    <div className="col-sm-1">=</div>
                    <div className="col-sm-4"><label>{this.state.denominations[1].product} </label></div>
                </div>
                <div className="well">
                    <div className="col-sm-3"><input type="number" id={this.state.denominations[2].currency} value={this.state.denominations[2].qty} onChange={this.handleQtyChange}/></div>
                    <div className="col-sm-1">X</div>
                    <div className="col-sm-3"><label>{this.state.denominations[2].currency} </label></div>
                    <div className="col-sm-1">=</div>
                    <div className="col-sm-4"><label>{this.state.denominations[2].product} </label></div>
                </div>
                <div className="well">
                    <div className="col-sm-3"><input type="number" id={this.state.denominations[3].currency} value={this.state.denominations[3].qty} onChange={this.handleQtyChange}/></div>
                    <div className="col-sm-1">X</div>
                    <div className="col-sm-3"><label>{this.state.denominations[3].currency} </label></div>
                    <div className="col-sm-1">=</div>
                    <div className="col-sm-4"><label>{this.state.denominations[3].product} </label></div>
                </div>
                <div className="well">
                    <div className="col-sm-3"><input type="number" id={this.state.denominations[4].currency} value={this.state.denominations[4].qty} onChange={this.handleQtyChange}/></div>
                    <div className="col-sm-1">X</div>
                    <div className="col-sm-3"><label>{this.state.denominations[4].currency} </label></div>
                    <div className="col-sm-1">=</div>
                    <div className="col-sm-4"><label>{this.state.denominations[4].product} </label></div>
                </div>
                <div className="well">
                    <div className="col-sm-3"><input type="number" id={this.state.denominations[5].currency} value={this.state.denominations[5].qty} onChange={this.handleQtyChange}/></div>
                    <div className="col-sm-1">X</div>
                    <div className="col-sm-3"><label>{this.state.denominations[5].currency} </label></div>
                    <div className="col-sm-1">=</div>
                    <div className="col-sm-4"><label>{this.state.denominations[5].product} </label></div>
                </div>
                <div className="well">
                    <div className="col-sm-3"><input type="number" id={this.state.denominations[6].currency} value={this.state.denominations[6].qty} onChange={this.handleQtyChange}/></div>
                    <div className="col-sm-1">X</div>
                    <div className="col-sm-3"><label>{this.state.denominations[6].currency} </label></div>
                    <div className="col-sm-1">=</div>
                    <div className="col-sm-4"><label>{this.state.denominations[6].product} </label></div>
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
    handleSubmit: function(){
      this.setState({amount: 0.00});
    },
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
    handleSubmit: function() {
     this.setState({Date: ''});
    },
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
                <input type="text" class="form-control" size={this.props.size} placeholder={this.props.placeholder}  value={this.state.Date} onChange={this.handleChange} />
            </div>
        );
    },
});



var closeoutInstance = ReactDOM.render(
    <Closeout />,
    document.getElementById('content')
);



