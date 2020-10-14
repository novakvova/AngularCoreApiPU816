using Microsoft.EntityFrameworkCore.Migrations;

namespace FastFood.WebApi.Migrations
{
    public partial class changetypevalueuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Age",
                table: "AspNetUsers",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Age",
                table: "AspNetUsers",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
