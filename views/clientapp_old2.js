/**
 * Created by soundararajanvenkatasubramanian on 8/29/16.
 */
//require('react-datetime');

const StoreList = React.createClass({
    render: function(){
        return(
            <div>
                <span>Select a store:</span>
                <select class="selectpicker">
                    <optgroup label="Stores">
                        <Store storename="Fairfield--"></Store>
                        <Store storename="Vallejo--"></Store>
                        <Store storename="Bayfair--"></Store>
                        <Store storename="Santa Rosa--"></Store>
                    </optgroup>
                </select>
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
                <input type="text" class="form-control" placeholder="Amount"/>
            </div>
        );
    },
});

const Closeout = React.createClass({
    render: function(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <StoreList />
                    </div>

                    <div className="col-md-4">
                        <AmountInput label="Posted:"/>
                    </div>
                    <div className="col-md-4">
                        <AmountInput label="Actual:"/>
                    </div>
                </div>
                <hr />
                <h4>Denomination:</h4>
                <DenominationRow currency="100"/>
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

    render: function(){
        return(
            <div className="row">
                <div className="well">
                    <div className="col-sm-3"><input type="number" defaultValue="0" id="qty"/></div>

                    <div className="col-sm-3"><input type="numeric" defaultValue={this.props.currency} id="curr"/></div>
                    <div className="col-sm-2">=</div>
                    <div className="col-sm-4"><input type="number" id="amount"/></div>
                </div>
            </div>
        );
    }
});



ReactDOM.render(
    <Closeout />,
    document.getElementById('content')
);


