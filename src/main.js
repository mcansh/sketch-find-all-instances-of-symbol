import createSelect from './modules/createSelect';
import selectAllSymbols from './modules/selectAllSymbols';

function showMessage(txt, timeout = 5) {
  NSApplication.sharedApplication()
    .orderedDocuments()
    .firstObject()
    .displayMessage_timeout(txt, timeout);
}

const onRun = (context) => {
  const { document: doc } = context;
  const pagesWithSymbolNames = [];
  const pagesWithSymbol = [];
  const selectedLayer = context.selection.firstObject();
  if (!selectedLayer) {
    showMessage('No symbol selected');
    return;
  }
  const selectedLayerName = selectedLayer.name();
  let masterSymbol = selectedLayer;
  if (selectedLayer.isKindOfClass(MSSymbolInstance)) {
    masterSymbol = selectedLayer.symbolMaster();
  }
  if (
    selectedLayer.isKindOfClass(MSSymbolMaster) ||
    selectedLayer.isKindOfClass(MSSymbolInstance)
  ) {
    const pages = doc.pages();
    pages.forEach((page) => {
      const artboards = page.artboards();
      artboards.forEach((artboard) => {
        const layers = artboard.layers();
        layers.forEach((layer) => {
          const layerName = layer.name();
          if (
            layer instanceof MSSymbolInstance &&
            layer.isInstanceForMaster(masterSymbol)
          ) {
            pagesWithSymbolNames.push(page.name());
            pagesWithSymbol.push(page);
          }
        });
      });
    });
  }

  const alert = COSAlertWindow.new();
  alert.setMessageText('Pages with this symbol');
  const choosePropertySelect = createSelect(pagesWithSymbolNames, 0);
  alert.addAccessoryView(choosePropertySelect);
  alert.addButtonWithTitle('Go');
  alert.addButtonWithTitle('Cancel');
  if (alert.runModal() === 1000) {
    const uniquePages = pagesWithSymbol.filter((elem, index, self) => index === self.indexOf(elem),);
    const index = choosePropertySelect.indexOfSelectedItem();
    const page = uniquePages[index];
    doc.setCurrentPage(page);
    selectAllSymbols(doc.currentPage(), masterSymbol);
  }
};

export default onRun;
