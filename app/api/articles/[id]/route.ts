import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Article from '@/models/Article.model';

export async function GET(req: NextRequest) {
  await dbConnect();
  const id = req.nextUrl.pathname.split('/').pop(); // Extracting the id from the URL

  try {
    const article = await Article.findById(id).lean();
    if (!article) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const id = req.nextUrl.pathname.split('/').pop(); // Extracting the id from the URL
  const { title, content, userId } = await req.json();

  try {
    const article = await Article.findOneAndUpdate(
      { userId, _id: id },
      { $set: { title, content } },
      { new: true }
    );

    if (!article) {
      return NextResponse.json(
        { message: 'Article not found or you are not the author' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
