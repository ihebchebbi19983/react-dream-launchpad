interface StockUpdatePayload {
  id_product: number;
  xs_size: number;
  s_size: number;
  m_size: number;
  l_size: number;
  xl_size: number;
  xxl_size: number;
}

export const updateProductStock = async (cartItems: any[]) => {
  console.log('Updating stock for items:', cartItems);
  
  try {
    const stockUpdates = cartItems.map(item => {
      // Initialize all sizes to 0
      const stockUpdate: StockUpdatePayload = {
        id_product: item.id,
        xs_size: 0,
        s_size: 0,
        m_size: 0,
        l_size: 0,
        xl_size: 0,
        xxl_size: 0
      };

      // Update the specific size that was purchased
      switch (item.size?.toLowerCase()) {
        case 'xs':
          stockUpdate.xs_size = item.quantity;
          break;
        case 's':
          stockUpdate.s_size = item.quantity;
          break;
        case 'm':
          stockUpdate.m_size = item.quantity;
          break;
        case 'l':
          stockUpdate.l_size = item.quantity;
          break;
        case 'xl':
          stockUpdate.xl_size = item.quantity;
          break;
        case 'xxl':
          stockUpdate.xxl_size = item.quantity;
          break;
      }

      return stockUpdate;
    });

    console.log('Sending stock updates:', stockUpdates);

    // Send updates for each product
    const updatePromises = stockUpdates.map(update => 
      fetch('https://respizenmedical.com/fiori/recount_product.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update)
      })
    );

    const results = await Promise.all(updatePromises);
    console.log('Stock update results:', results);

    return results;
  } catch (error) {
    console.error('Error updating stock:', error);
    throw error;
  }
};