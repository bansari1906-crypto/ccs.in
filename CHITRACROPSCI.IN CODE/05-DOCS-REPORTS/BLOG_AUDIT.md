# Blog Audit

## Database Blog Posts
Total: 4 records in `fullstack_blog_blogpost.csv`:
1. **How to Increase Plant Growth Naturally** (slug: how-to-increase-plant-growth-naturally)
2. **Best Pesticide For Whitefly Control In Cotton** (slug: best-pesticide-for-whitefly-control-in-cotton)
3. **How to Increase Crop Yield in Gujarat & Rajasthan** (slug: how-to-increase-crop-yield-in-gujarat-rajasthan)
4. **Best Fertilizer For Vegetables And Fruit Crops** (slug: best-fertilizer-for-vegetables-and-fruit-crops)

## Frontend Blog Usage
- Uses `useBlogPosts()` hook from `usePublicData.ts`
- Calls `/blog/` Django API endpoint
- Pages: Blog.tsx, BlogDetail.tsx

## Live Site Blog
Static HTML blog content matches the database blog topics
