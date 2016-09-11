const Closeout = React.createClass({
  getInitialState: function(){
     return {
       selectedStore: "-----",
       posted: 0.00,
       closeoutRows: [],
       closeoutCurrentRow: {},
       denominations: []
     };
  },
  postedChangeHandler: function(posted){
     this.state.posted = posted;
  },
  submitClickHandler: function(){
    var temp = {store: this.state.selectedStore, posted: this.state.posted, denomoinations: this.state.denominations};
    this.setState( { closeoutCurrentRow: temp} );
    var closeoutRowsTmp = this.state.closeoutRows;
    closeoutRowsTmp.push(temp);
    this.setState( { closeoutRows: closeoutRowsTmp});
  },
  changeStoreHandler: function(event){
    this.setState({ selectedStore: event.target.value});
  },
  denominationsChangeHandler: function(denoms){
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
              <div className="col-md-4">
                <div>
                  <span>Select a store:</span>
                  <select class="selectpicker" onChange={this.changeStoreHandler}>
                      <optgroup label="Stores">
                            {stores}
                      </optgroup>
                  </select>
              </div>
              </div>
              <div className="col-md-4">
                  <PostedCloseoutInput label="Posted:" onChange={this.postedChangeHandler}/>
              </div>
              <div className="col-md-4">
                  <button onClick={this.submitClickHandler}>Submit</button>
              </div>                
          </div>
          <hr/> 
          <Denominations onChange={this.denominationsChangeHandler}/>        
        </div>
      );
  }
});

const printArr = function (arr){
  var string = "";
  arr.forEach( (item) => {
    string += item.currency + " => " + item.qty + " "
  });
  return string;
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
            amount: -100.00
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

