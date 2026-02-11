#!/bin/bash
# Quick verification script to check all cart-related files

echo "🔍 KickVibe Cart System - File Verification"
echo "==========================================="
echo ""

echo "✓ Checking key files exist..."
files=(
  "Vlad-Szabo/KickVibe/pages/cart.html"
  "Vlad-Szabo/KickVibe/pages/product.html"
  "Vlad-Szabo/KickVibe/pages/shop.html"
  "Vlad-Szabo/KickVibe/js/state.js"
  "Vlad-Szabo/KickVibe/js/utils.js"
  "Vlad-Szabo/KickVibe/test-cart.html"
  "Vlad-Szabo/KickVibe/e2e-test.html"
  "Vlad-Szabo/KickVibe/CART_FIXES_SUMMARY.md"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file - NOT FOUND"
  fi
done

echo ""
echo "✓ Checking for critical fixes in cart.html..."

if grep -q 'id="cartBtn"' "Vlad-Szabo/KickVibe/pages/cart.html"; then
  echo "  ✅ Cart button added"
else
  echo "  ❌ Cart button missing"
fi

if grep -q 'function renderCart()' "Vlad-Szabo/KickVibe/pages/cart.html"; then
  echo "  ✅ renderCart function exists"
else
  echo "  ❌ renderCart function missing"
fi

if grep -q 'try {' "Vlad-Szabo/KickVibe/pages/cart.html"; then
  echo "  ✅ Error handling added"
else
  echo "  ❌ Error handling missing"
fi

echo ""
echo "✓ Checking state.js for logging..."

if grep -q 'console.log' "Vlad-Szabo/KickVibe/js/state.js" | grep -q 'addToCart'; then
  echo "  ✅ Logging added to addToCart"
else
  echo "  ⚠️  Check if logging is present in addToCart"
fi

echo ""
echo "==========================================="
echo "✅ Verification Complete!"
echo ""
echo "Next steps:"
echo "1. Open e2e-test.html to run end-to-end tests"
echo "2. Follow CART_FIXES_SUMMARY.md for manual testing"
echo "3. Check browser console (F12) for any errors"
echo ""
