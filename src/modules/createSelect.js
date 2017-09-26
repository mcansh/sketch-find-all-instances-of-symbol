const createSelect = (options, index = 0) => {
  const select = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 200, 25));
  select.addItemsWithTitles(options);

  select.selectItemAtIndex(index);

  return select;
};

export default createSelect;
