// app/middleware.ts

export function middleware(req: Request) {
    // هنا يمكنك إضافة أي منطق لتطبيقه قبل إرسال الطلبات
    // مثل التحقق من JWT أو إضافة رؤوس معينة (Headers)
    
    console.log('Middleware is running for:', req.url);
  
    // إذا كنت ترغب في تنفيذ بعض المنطق مثل التحقق من الـ JWT:
    // const token = req.headers.get("Authorization");
    // if (!token) {
    //   return new Response("Unauthorized", { status: 401 });
    // }
  
    // يمكنك أيضًا التعديل على الاستجابة قبل إرسالها
    return new Response("Middleware is working", { status: 200 });
  }
  
  // تحديد المسارات التي سيتم تطبيق الـ middleware عليها
  // في هذه الحالة، نطبق الـ middleware على كل المسارات بما في ذلك الـ API
  export const config = {
    matcher: ['/', '/api/:path*'], // سيتم تطبيق الـ middleware على كل المسارات
  };
  