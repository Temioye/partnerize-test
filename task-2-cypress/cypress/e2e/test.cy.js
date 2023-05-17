describe('Search for item', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display 7 products by default', () => {
    cy.get('#homefeatured').children().should('have.length', 7);
  });

  it('Should return correct product when searched', () => {
    cy.get('#search_query_top').type('blouse{enter}');

    cy.get('#product_list')
      .children()
      .should('have.length', 1)
      .find('.product-name')
      .should('include.text', 'Blouse');
  });

  it('Should show correct product information when selected from search results', () => {
    cy.get('#search_query_top').type('blouse{enter}');
    cy.contains('.lnk_view', 'More').click();
    cy.get('#bigpic').should('be.visible');
    cy.get('#short_description_content').invoke('text').should('not.be.null');
  });

  it('Should successfully add product to cart', () => {
    cy.get('#search_query_top').type('blouse{enter}');
    cy.contains('.lnk_view', 'More').click();

    cy.get('#quantity_wanted').clear().type('1');
    cy.get('#group_1').select('M', { force: true });
    cy.get('#add_to_cart').click();
    cy.get('#layer_cart_product_title').should('include.text', 'Blouse');
    cy.get('.layer_cart_product > .title').should(
      'include.text',
      'Product successfully added to your shopping cart'
    );
    cy.get('#layer_cart_product_attributes').should('include.text', 'M, Black');
    cy.get('#layer_cart_product_quantity').should('include.text', '1');
  });
});
