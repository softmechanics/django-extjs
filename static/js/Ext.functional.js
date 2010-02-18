function autoWindow(title) {
    var win = new Ext.Window({
            title:title
            ,autoWidth:true
            ,autoScroll:true
            ,autoHeight:true
            ,callback:function() {}
    });

    win.on("remove", function() {
        if(win.items.length == 0)
            win.hide();
    });

    return win;
}

function tempPanel(elem) {
    var panel = new Ext.Panel(elem);
    
    panel.on("remove", function() {
        if(panel.items.length == 0)
            panel.destroy();
    });

    return panel;
}


function persistentWindow(w) {
    w.on('beforeclose', function () { w.hide(); return false; });
    return w;
}

function renderToWindow(win, widget) {
    widget.callback = function(wid) {
        win.add(wid);
        win.doLayout();
        win.show();

        wid.on('destroy', function () {
            win.remove(widget);
        });
    };

    try {
        widget.callback();
    } catch(e) { }

    return widget;
}

function renderAllToWindow(win, widgets) {
    Functional.map(renderToWindow.curry(win), widgets);
    return widgets;
}

function popup(title, widget) {
    return renderToWindow(autoWindow(title), widget);
}

function clearElement(id) {
    // remove all children and text nodes from element
    var elem = Ext.get(id)
    var dom = elem.dom;
    while(dom.firstChild) dom.removeChild(dom.firstChild);
    elem.clean();
}

function renderTo(elem, widget) {
    if ("string" == typeof(elem)) {
        elem = tempPanel();
    }

    return renderToWindow(elem, widget);
}

function renderAllTo(elem, widgets) {
    if ("string" == typeof(elem)) {
        clearElement(elem);
        elem = tempPanel(elem);
    }

    return Functional.map(renderTo.curry(elem), widgets);
}
