import type { APIRoute } from 'astro';
import { createServerClient } from '../../../../lib/supabase-server';

export const POST: APIRoute = async ({ params, locals }) => {
  const supabase = createServerClient();
  const profile = locals.profile;

  if (!profile?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const postId = params.id;
  const userId = profile.id;

  // Check if like exists
  const { data: existingLike } = await supabase
    .from('post_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .maybeSingle();

  // Get current post likes_count
  const { data: post } = await supabase
    .from('posts')
    .select('likes_count')
    .eq('id', postId)
    .single();

  const currentCount = post?.likes_count ?? 0;

  if (existingLike) {
    // Unlike
    await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);

    await supabase
      .from('posts')
      .update({ likes_count: Math.max(0, currentCount - 1) })
      .eq('id', postId);

    return new Response(JSON.stringify({ liked: false, likes_count: Math.max(0, currentCount - 1) }), { status: 200 });
  } else {
    // Like
    await supabase
      .from('post_likes')
      .insert({ post_id: postId, user_id: userId });

    await supabase
      .from('posts')
      .update({ likes_count: currentCount + 1 })
      .eq('id', postId);

    return new Response(JSON.stringify({ liked: true, likes_count: currentCount + 1 }), { status: 200 });
  }
};
