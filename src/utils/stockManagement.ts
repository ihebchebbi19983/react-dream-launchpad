interface StockUpdatePayload {
  id_product: number;
  xs_size?: number;
  s_size?: number;
  m_size?: number;
  l_size?: number;
  xl_size?: number;
  xxl_size?: number;
}

export const updateProductStock = async (cartItems: any[]) => {
  console.log('Starting stock update for items:', cartItems);
  
  try {
    // Group items by product ID and accumulate quantities by size
    const stockUpdates = cartItems.reduce((acc: { [key: number]: StockUpdatePayload }, item) => {
      const productId = item.id;
      
      if (!acc[productId]) {
        acc[productId] = {
          id_product: productId,
          xs_size: 0,
          s_size: 0,
          m_size: 0,
          l_size: 0,
          xl_size: 0,
          xxl_size: 0
        };
      }

      // Update the specific size that was purchased
      const sizeKey = `${item.size?.toLowerCase()}_size` as keyof Omit<StockUpdatePayload, 'id_product'>;
      if (sizeKey in acc[productId]) {
        acc[productId][sizeKey] = (acc[productId][sizeKey] || 0) + item.quantity;
      }

      return acc;
    }, {});

    console.log('Prepared stock updates:', stockUpdates);

    // Send updates for each product
    const updatePromises = Object.values(stockUpdates).map(async (update) => {
      console.log(`Sending stock update for product ${update.id_product}:`, update);
      
      const response = await fetch('https://respizenmedical.com/fiori/recount_product.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update)
      });

      if (!response.ok) {
        throw new Error(`Stock update failed for product ${update.id_product}`);
      }

      const result = await response.json();
      console.log(`Stock update response for product ${update.id_product}:`, result);
      return result;
    });

    const results = await Promise.all(updatePromises);
    console.log('All stock updates completed:', results);
    return results;
  } catch (error) {
    console.error('Error updating stock:', error);
    throw error;
  }
};