const selectAllSymbols = (page, masterSymbol) => {
  const layersToSelect = [];
  const artboards = page.artboards();

  artboards.forEach((artboard) => {
    const layers = artboard.layers();

    layers.forEach((layer) => {
      if (
        layer instanceof MSSymbolInstance &&
        layer.isInstanceForMaster(masterSymbol)
      ) {
        layersToSelect.push(layer);
      } else if (
        layer instanceof MSSymbolMaster &&
        layer.name().isEqualToString(masterSymbol.name())
      ) {
        layersToSelect.push(layer);
      }
    });
  });

  page.changeSelectionBySelectingLayers(layersToSelect);
};

export default selectAllSymbols;
