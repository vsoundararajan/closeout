/**
 * Created by soundararajanvenkatasubramanian on 8/29/16.
 */
//require('react-datetime');

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
                <select class="selectpicker">
                    <optgroup label="Stores">
                          {stores}
                    </optgroup>
                </select>
            </div>
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

const Closeout = React.createClass({
   getInitialState: function () {
      return {
         total: 0.00,
      };
    },
    calculateTotal: function (){
        alert("hitting here");
       this.setState({total: (total + 100)});
    },
    render: function(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <StoreList />
                    </div>

                    <div className="col-md-3">
                        <AmountInput label="Posted:"/>
                    </div>
                    <div className="col-md-3">
                        <AmountInput label="Actual:" value={this.state.total}/>
                    </div>
                    <div className="col-md-3">
                        <button>Submit</button>
                    </div>
                </div>
                <hr />
                <h4>Denomination:</h4>
                <DenominationRow currency="100" onChange={this.calculateTotal}/>
                <DenominationRow currency="50"/>
                <DenominationRow currency="20"/>
                <DenominationRow currency="10"/>
                <DenominationRow currency="5"/>
                <DenominationRow currency="2"/>
                <DenominationRow currency="1"/>
            </div>
        );
    },
});

const DenominationRow = React.createClass({
      getInitialState: function () {
          return {
             qty: 0,
             amount: 0.00,
          };
        },
        handleQtyChange: function (event){
           //alert("hitting here " + (event.target.value * this.props.currency));
           this.setState({qty: event.target.value, amount: (event.target.value * this.props.currency)});
        },

    render: function(){
        return(
            <div className="row">
                <div className="well">
                    <div className="col-sm-3"><input type="number" value={this.state.qty} id="qty" onChange={this.handleQtyChange}/></div>

                    <div className="col-sm-3"><input type="numeric" value={this.props.currency} id="curr"/></div>
                    <div className="col-sm-2">=</div>
                    <div className="col-sm-4"><input type="number" id="amount" value={this.state.amount}/></div>
                </div>
            </div>
        );
    }
});



ReactDOM.render(
    <Closeout />,
    document.getElementById('content')
);


