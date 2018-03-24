namespace Caracal.Web.Nova.Builder.Model.Shapes {
  public class Process {
    public string Name { get; set; }
    public object Activities { get; set; }

    public static Process Parse(string canvas) {
      var parser = new ShapeParser(canvas);
      return parser.Parse();
    }
  }
}
