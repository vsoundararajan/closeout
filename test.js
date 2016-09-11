const Closeout = React.createClass({
   getInitialState: function () {
      const stores = Data.map( (store) => {
         return(
           <Store storename={store.name} key={store.id} />
         );
      });
     return {
        stores: stores,
      };
   },
   render: function () {
     return(
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                   <div className="well">
                       Blah
                   </div>
                </div>
            </div>
        </div>
      );
   }
});

const Store = React.createClass({
    render: function(){
        return(
            <option>{this.props.storename}</option>
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
                <select class="selectpicker">
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

